import React, { useEffect, useState } from 'react';

const ResizeListener = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // 添加resize事件监听器
    window.addEventListener('resize', handleResize);

    // 在组件卸载时移除事件监听器，以防止内存泄漏
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空数组作为第二个参数表示effect仅在组件挂载和卸载时运行

  return (
    <div>
      <p>当前浏览器宽度: {windowWidth}px</p>
    </div>
  );
};

export default ResizeListener;