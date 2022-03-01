import path from "path";

export default {
  typescript: true,
  files: ["./src/docz/**/*.mdx"],
  title: "@mmcuav/mmc-ui-react",
  port: 4000,
  menu: [
    "使用指南",
    "安装教程",
    {
      name: "组件列表",
      menu: ["图表统计类", "播放器类"]
    }
  ]
};
