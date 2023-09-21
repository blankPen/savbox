import { useState, useEffect, useRef } from "react";
import "./index.scss";
import { EventMap } from "./event";


const CloseBtn = ({ onClick }) => (
    <div className="close-btn" onClick={onClick}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.39417 1.60587C2.17646 1.38816 1.82347 1.38816 1.60575 1.60587C1.38803 1.82359 1.38803 2.17658 1.60575 2.3943L5.21154 6.00008L1.60575 9.60587C1.38803 9.82359 1.38803 10.1766 1.60575 10.3943C1.82347 10.612 2.17646 10.612 2.39417 10.3943L5.99996 6.78851L9.60575 10.3943C9.82347 10.612 10.1765 10.612 10.3942 10.3943C10.6119 10.1766 10.6119 9.82359 10.3942 9.60587L6.78839 6.00008L10.3942 2.3943C10.6119 2.17658 10.6119 1.82359 10.3942 1.60587C10.1765 1.38816 9.82347 1.38816 9.60575 1.60587L5.99996 5.21166L2.39417 1.60587Z" fill="currentColor"></path></svg>
    </div>
)

const StatusMap = {
    loading: () => (
        <div className="box loading-box">
            <svg className="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9123 10.9404C19.9653 10.3676 19.5438 9.86027 18.971 9.80731C18.3981 9.75436 17.8908 10.1758 17.8378 10.7487L19.9123 10.9404ZM14.9576 3.94045C15.4056 4.30148 16.0613 4.23104 16.4224 3.78313C16.7834 3.33522 16.713 2.67944 16.265 2.31842L14.9576 3.94045ZM10.0399 17.8334C5.71257 17.8334 2.20841 14.3335 2.20841 10.0209H0.125081C0.125081 15.4883 4.56618 19.9167 10.0399 19.9167V17.8334ZM2.20841 10.0209C2.20841 5.70829 5.71257 2.20841 10.0399 2.20841V0.125081C4.56618 0.125081 0.125081 4.5535 0.125081 10.0209H2.20841ZM17.8378 10.7487C17.4707 14.7198 14.1207 17.8334 10.0399 17.8334V19.9167C15.2033 19.9167 19.4467 15.977 19.9123 10.9404L17.8378 10.7487ZM10.0399 2.20841C11.904 2.20841 13.6132 2.85683 14.9576 3.94045L16.265 2.31842C14.5634 0.946868 12.3963 0.125081 10.0399 0.125081V2.20841Z" fill="currentColor" fill-opacity="0.85"></path></svg>
            <span className="text">快照生成中...</span>
        </div>
    ),
    success: ({ data, onHide }) => (
        <div className="box success-box">
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3041" width="20" height="20"><path d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m182.613333 297.354667a32 32 0 0 0-45.258666 0.032L458.922667 573.44l-84.341334-83.989333a32 32 0 0 0-45.162666 45.344l106.986666 106.549333a32 32 0 0 0 45.226667-0.064l213.013333-213.333333a32 32 0 0 0-0.032-45.258667z" fill="#00b42a" p-id="3042"></path></svg>
            <span className="text">
                快照生成成功，
                <a target="_blank" href={data?.outputUrl}>点击查看</a>
            </span>
            <CloseBtn onClick={onHide} />
        </div>
    ),
    error: ({ onHide, data }) => (
        <div className="box error-box">
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3415" width="20" height="20"><path d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m-86.474667 296.96a30.570667 30.570667 0 1 0-43.232 43.232L468.768 512l-86.474667 86.474667a30.570667 30.570667 0 1 0 43.232 43.232L512 555.232l86.474667 86.474667a30.570667 30.570667 0 1 0 43.232-43.232L555.232 512l86.474667-86.474667a30.570667 30.570667 0 1 0-43.232-43.232L512 468.768z" fill="#ff0000" p-id="3416"></path></svg>
            <span className="text">{data || '快照生成失败，请重试'}</span>
            <CloseBtn onClick={onHide} />
        </div>
    ),
}

export default function App() {
    const boxRef = useRef(null);
    const [status, setStatus] = useState<{ type: string, data?: any }>({ type: 'none' })

    useEffect(() => {
        EventMap.set('updateMessageBox', async function (data) {
            console.log('===>>>updateMessageBox', data);
            setStatus(data);
        });
        // chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
        //     const { type, data } = request;
        //     if (type === 'updateMessageBox') {
        //         setStatus(data);
        //         sendResponse();
        //     }
        // });

        // 浏览器窗口高度发生改变触发
        const resizeChange = async (e) => {
            let [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

            if (tab) chrome.tabs.sendMessage(tab.id, { type: 'resizeMessageBox', data: e.contentRect.height })
        };


        // 监听的函数
        const resize = new ResizeObserver((e) => {
            for (const ent of e) resizeChange(ent);
        });

        // 传入监听对象
        resize.observe(boxRef.current);
        // 及时销毁监听函数（重要!!!）
        return () => {
            resize.unobserve(boxRef?.current);
        };
    }, []);

    const onHide = () => {
        setStatus({ type: 'none' });
        chrome.runtime.sendMessage({ type: 'hideMessageBox' });
    }

    const Status = StatusMap[status.type]

    return (
        <div ref={boxRef}>
            {Status && <div className="snapshot-box" >
                <Status data={status.data} onHide={onHide} />
            </div>}
        </div>
    );
}
