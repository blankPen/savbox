import React, { useEffect, useState } from "react";
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, Password, Submit, Radio, FormButtonGroup } from '@formily/antd'
import { Tabs, Card, Spin, notification } from 'antd'
import "antd/dist/antd.less";
import "@pages/options/Options.css";

const form = createForm({
    validateFirst: true,
})

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Password,
        Radio,
        // VerifyCode,
    },
    // scope: {
    //     icon(name) {
    //         return React.createElement(ICONS[name])
    //     },
    // },
})

const schema = {
    type: 'object',
    properties: {
        oss: {
            type: 'string',
            title: '对象储存服务',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
            default: 'tencent',
            enum: [
                { label: '腾讯云', value: 'tencent' },
                { label: '阿里云', value: 'aliyun', disabled: true },
            ],
            'x-component-props': {
                optionType: 'button',
                buttonStyle: 'solid',
            },
        },
        SecretId: {
            type: 'string',
            title: 'SecretId',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            // 'x-component-props': {
            //     prefix: "{{icon('UserOutlined')}}",
            // },
        },
        SecretKey: {
            type: 'string',
            title: 'SecretKey',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        Bucket: {
            type: 'string',
            title: 'Bucket',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        Region: {
            type: 'string',
            title: 'Region',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        rule: {
            type: 'string',
            title: '解析规则',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
        },
    },
}

const KEY = 'snapshot_config';
const Options: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        chrome.storage.local.get(KEY).then((res) => {
            const values = res[KEY];
            setLoading(false);
            form.setValues(values, 'merge');
        });
    }, [])

    const onSubmit = async (res) => {
        setLoading(true)
        await chrome.storage.local.set({ [KEY]: res });
        setLoading(false);
        notification.success({ message: '保存成功' })
    };
    return (
        <div className="options-container">
            <Card title="偏好设置" style={{ width: 780 }}>
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        labelCol={5}
                        wrapperCol={16}
                        layout="horizontal"
                        size="default"
                        onAutoSubmit={onSubmit}
                    >
                        <div style={{ minHeight: 500 }}>
                            <SchemaField schema={schema} />
                        </div>
                        <FormButtonGroup.FormItem>
                            <Submit block size="large">保存</Submit>
                        </FormButtonGroup.FormItem>
                    </Form>
                </Spin>
            </Card>
            {/* <div className="title">偏好设置</div>
            <div className="options-form">

            </div> */}
        </div>
    );
};

export default Options;
