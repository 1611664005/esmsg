## EsMsg V1.0 -简约弹窗层插件
- 基于jquery开发的简约弹窗层插件(故需要提前引入jquery可使用)，适用于PC端以及移动端，调用简单使用方便。
## 目录架构
- esmsg  [插件包]
    - img [插件图片]
        - ...
    - lib [外部包]
        - jquery
        - ...
    - esmsg.css  [插件样式]
    - esmsg.js   [插件逻辑]
- test   [调用事例]
    - index.html [插件调用事例]

## 图示
![image text](https://github.com/1611664005/esmsg/blob/master/tu.gif)

## 开放函数

普通提示 [esmsg.msg]
```
esmsg.msg("提示信息");
```

弹窗提示 [esmsg.alert]
```
esmsg.alert({
    title:'提示标题',    //显示标题
    text:'提示内容',     //显示内容
    type: 'success',    //状态可选:success/warning/error
    background: true,   //背景层开关
    yes:function () {   //确认回调函数，将在用户点击确认按钮后调用

    }
});
```

loading层 [esmsg.loading]
```
esmsg.loading();
```

关闭弹窗函数（用于关闭loading层）
```
esmsg.close();
```

## 更多使用方案请参考插件调用事例
