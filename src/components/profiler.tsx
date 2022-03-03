import React, { ProfilerOnRenderCallback, ProfilerProps } from "react";

type Props = { metadata?: string; phases?: ("mount" | "update")[] } & Omit<
  ProfilerProps,
  "onRender"
>;

let queue: unknown[] = [];

const sendProfilerQueue = () => {
  if (!queue.length) {
    return;
  }
  const queueToSend = [...queue];
  queue = [];
  console.log(queueToSend);
};

setInterval(sendProfilerQueue, 5000);

export const Profiler = ({ metadata, phases, ...props }: Props) => {
  const reportProfiler: ProfilerOnRenderCallback = (
    id, // 发生提交的 Profiler 树的 “id”
    phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration, // 本次更新 committed 花费的渲染时间
    baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间
    commitTime, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合
  ) => {
    queue.push({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    });
  };
  return <React.Profiler onRender={reportProfiler} {...props} />;
};
