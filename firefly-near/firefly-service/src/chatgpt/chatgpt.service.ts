import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import type { ChatCompletionRequestMessage } from 'openai';
import { react, command, node, refactor } from './prompt';
import FsHandler from '../generator/fshandler';
import Generator from '../generator/ast';
import * as pathInstance from 'path';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
  AIMessagePromptTemplate,
} from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import {
  HumanChatMessage,
  SystemChatMessage,
  AIChatMessage,
} from 'langchain/schema';
import { OpenAI } from 'langchain/llms/openai';
import { VetorStoresService } from '../vetorstores/vetorstores.service';
import globalConfig from '../globalConfig';
import CodeChain from '../codechain';
import { serialNode } from '../codechain/serialNode';

@Injectable()
export class ChatgptService {
  openai: any;
  chatOpenAI: any;
  apiKey: string;
  rootDir: string;
  messageMap = new Map();
  cacheMessageMap = new Map();
  chain: LLMChain;
  testchain: LLMChain;
  globalConfig = globalConfig.getInstance();
  fsHandler = FsHandler.getInstance();
  codeChain: CodeChain;
  currentChainId: string;
  pagePath: string;

  constructor(readonly vetorStoresService: VetorStoresService) {
    this.codeChain = new CodeChain(vetorStoresService);
  }
  connect(): boolean {
    console.log('************3');
    if (this.apiKey !== this.globalConfig.apikey) {
      // this.codeChain.init();
    }
    this.apiKey = this.globalConfig.apikey;
    this.chatOpenAI = new ChatOpenAI(
      {
        openAIApiKey: this.apiKey,
        temperature: 0,
      },
      {
        basePath: this.globalConfig.proxyUrl,
      },
    );
    // if (this.apiKey) {
    //   this.vetorStoresService.connectVectorStore('antd-test10011-collection');
    //   return true;
    // } else {
    //   return true;
    // }
    return true;
  }

  async generate(data: {
    message: ChatCompletionRequestMessage;
    codeOperateType?: string;
    path: string;
    promptId: string;
  }) {
    const { message, path } = data;
    if (!this.apiKey) {
      return {
        error: 'not api key',
      };
    }
    const res = await this.checkPromptType(`
    将文本分类为：创建，修改，未知
    文本：${message.content}
        `);
    const typeText = res;

    if (!this.chain) this.initChat();
    const { response, id } = await this.call(message.content);
    const { text } = response;
    const firstMessage = {
      content: text,
      role: 'assistant',
    };

    if (typeText.includes('创建')) {
      const { content } = firstMessage;
      const fileName = this.fsHandler.extractFileName(content);
      const filePath = `src/pages/${fileName}/index.tsx`;
      this.pagePath = pathInstance.join(this.rootDir, filePath);
      this.currentChainId = id;
      // FsHandler.getInstance().createFile(
      //   pathInstance.join(this.rootDir, filePath),
      //   content,
      // );
      // const routerPath = pathInstance.join(
      //   this.rootDir,
      //   'src/routes/index.tsx',
      // );
      // const routerContent = Generator.getInstance().appendRouter(
      //   FsHandler.getInstance().parseFile(routerPath),
      //   `var data = {
      //           path: '/${fileName}',
      //           element: <${fileName} />,
      //         }`,
      //   `import ${fileName} from '../pages/${fileName}';`,
      // );
      // FsHandler.getInstance().writeFile(routerPath, routerContent, true);
      return {
        message: {
          role: 'assistant',
          content,
        },
        url: `/${fileName}`,
        path: pathInstance.join(this.rootDir, filePath),
        chainId: this.currentChainId,
      };
    } else if (typeText.includes('修改')) {
      FsHandler.getInstance().writeFile(path, firstMessage.content, true);
      return {
        message: firstMessage,
      };
    } else {
      return {
        message: firstMessage,
      };
    }
  }

  getAppKey() {
    return {
      status: 1,
      data: {
        appKey: this.apiKey,
      },
    };
  }

  getPrompt() {
    return [react, command];
  }

  getCodePrompt() {
    return [node, refactor];
  }

  async startCodeDocument(data: any) {
    const { files, prompt } = data;
    const { messages } = prompt;
    const userPrompt = messages[1];
    const content = files[0].content;
    userPrompt.content = userPrompt.content
      .replace('[code block]', content)
      .replace('[language]', 'tsx or ts');
    const res = await this.generate(messages);
    return res;
  }

  async checkPromptType(text: string) {
    /**
     * 将文本分类为：创建，修改，未知
        文本：创建产品名称，产品详情。
    */
    const model = new OpenAI(
      {
        openAIApiKey: this.apiKey,
        temperature: 0,
        modelName: 'text-davinci-003',
      },
      {
        basePath: this.globalConfig.proxyUrl,
      },
    );
    const res = await model.call(text);
    console.log(res);
    return res;
  }

  async getMessageFormat(content: string, parentId?: string) {
    let docs;
    if (parentId) {
      docs = await this.vetorStoresService.getSimilaritySearchByFilter(
        content,
        {
          parentId,
        },
      );
    } else {
      docs = await this.vetorStoresService.getSimilaritySearch(content);
    }
    const { id } = docs[0].metadata;
    const messages = docs.reduce((prevValue, item) => {
      const { pageContent, metadata } = item;

      if (metadata.question) {
        prevValue.push(new HumanChatMessage(metadata.question));
      } else {
        prevValue.push(new HumanChatMessage(pageContent));
      }

      if (metadata && metadata.answer) {
        prevValue.push(new AIChatMessage(metadata.answer));
      }
      return prevValue;
    }, []);
    return {
      id,
      messages,
    };
  }

  initChat() {
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(this.globalConfig.systemMessage),
      new MessagesPlaceholder('preMessage'),
      HumanMessagePromptTemplate.fromTemplate('{input}'),
    ]);

    this.chain = new LLMChain({
      prompt: chatPrompt,
      llm: this.chatOpenAI,
      verbose: true,
    });
  }

  async call(content: string) {
    const { messages, id } = await this.getMessageFormat(content);
    const response = await this.chain.call({
      input: content,
      preMessage: messages,
    });
    return {
      response,
      id,
    };
  }

  async chainExecute(node: any) {
    const res = await this.codeChain.executePromptDebug(node);
    return res;
  }

  async saveflowInfo(data: any) {
    return await this.vetorStoresService.addDocument(data);
  }

  async executeProduceChain(id: string, pagePath: string) {
    const res = await this.vetorStoresService.getSimilaritySearchById('', id);
    console.log(res);
    const flow = res[0]?.metadata?.flow[0];
    if (flow) {
      const nodes = serialNode(flow);
      if (nodes.length > 1) {
        return await this.codeChain.executeChain(
          nodes,
          FsHandler.getInstance().readFileSync(pagePath || this.pagePath),
        );
      }
    }
    return null;
  }

  async testgpt() {
    if (!this.testchain) {
      console.log(this.globalConfig.systemMessage);
      const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
          this.globalConfig.systemMessage,
        ),
        new MessagesPlaceholder('preMessage'),
        HumanMessagePromptTemplate.fromTemplate('{input}'),
      ]);

      this.testchain = new LLMChain({
        prompt: chatPrompt,
        llm: this.chatOpenAI,
        verbose: true,
      });
    }

    const message = [
      new HumanChatMessage(`
创建查询表格页

字段包括
1.规则名称
2.描述	
3.服务调用次数
4.状态
5.上次调用时间
6.操作
操作包括：配置、订阅警报
      `),
      new AIChatMessage(`
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem, TableListPagination } from './data';
import { addRule, removeRule, rule, updateRule } from './service';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => '$万',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '上次调度时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (status === '0') {
          return false;
        }

        if (status === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          配置
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          订阅警报
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="新建规则"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;

      `),
    ];

    // message.push(new HumanChatMessage(``));

    const response = await this.testchain.call({
      input: `
创建查询表格页

字段包括
1.名称
2.描述	
3.服务调用次数
4.状态
5.上次调用时间
6.调用人
7.操作
操作包括：配置、订阅警报      
`,
      preMessage: message,
    });
    console.log('********', response);
  }
}
