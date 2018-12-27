# JLU Life

<img src="https://github.com/Steven128/JLUlife/blob/master/App/assets/ic_logo.png" alt="logo" width="128px">

## 下载地址

### Android

[酷安](https://www.coolapk.com/apk/210060)

[华为应用市场](http://appstore.huawei.com/app/C100513429)

[应用宝](https://sj.qq.com/myapp/detail.htm?apkName=com.brady.jlulife)


## 简介

JLU Life 是一款面向吉林大学学生的服务型APP。此应用并非官方应用，为个人开发，使用的接口均为学校官方开放接口，旨在帮助到同学们，为同学们的学习、生活提供便利。

此版本为2.0版本，使用React Native全新开发，目前支持 Android(4.1+)、iOS(9.0+), 欢迎有对RN感兴趣的小伙伴可以加入进来

1.0版本地址 [GitHub@bradywwang/JLUlife](https://github.com/bradywwang/JLUlife)

## 目前包括的功能

* 首页下一节课提示、教务系统通知

* 课程表，包括课程详情及任意周切换、多种自定义设置

* 校内通知、教务通知

* 成绩查询

* 空教室及图书馆馆藏查询

* 校园一卡通，包括查询基本信息、消费流水、转账充值、挂失、拾卡信息

* 下面是一些截图


<div>
  <span style="padding 30px; display: lnline-block">
    <img src="https://github.com/Steven128/JLUlife/blob/master/android/ScreenShots/1.png" alt="截图1" width="250px">
   </span>
  <span style="padding: 30px; display: lnline-block">
    <img src="https://github.com/Steven128/JLUlife/blob/master/android/ScreenShots/2.png" alt="截图2" width="250px">
  </span>
  <span style="padding: 30px; display: lnline-block">
    <img src="https://github.com/Steven128/JLUlife/blob/master/android/ScreenShots/3.png" alt="截图3" width="250px">
  </span>
  <span style="padding: 30px; display: lnline-block">
    <img src="https://github.com/Steven128/JLUlife/blob/master/android/ScreenShots/4.png" alt="截图4" width="250px">
  </span>
  <span style="padding: 30px; display: lnline-block">
    <img src="https://github.com/Steven128/JLUlife/blob/master/android/ScreenShots/5.png" alt="截图5" width="250px">
  </span>
  <span style="padding: 30px; display: lnline-block">
    <img src="https://github.com/Steven128/JLUlife/blob/master/android/ScreenShots/6.png" alt="截图6" width="250px">
  </span>
  <span style="padding 30px; display: lnline-block">
    <img src="https://github.com/Steven128/JLUlife/blob/master/android/ScreenShots/7.png" alt="截图7" width="250px">
   </span>
  <span style="padding 30px; display: lnline-block">
    <img src="https://github.com/Steven128/JLUlife/blob/master/android/ScreenShots/8.png" alt="截图8" width="250px">
   </span>
</div>

## 开发者

[Github@Steven128](https://github.com/Steven128/)

[Github@CloudMagician](https://github.com/CloudMagician)


## 开源相关

### 使用的开源库

* 弹框  [react-native-popup-dialog](https://github.com/jacklam718/react-native-popup-dialog)

* 上拉加载/下拉刷新  [react-native-refresh-list-view](https://github.com/huanxsd/react-native-refresh-list-view)

* Tab页切换  [react-native-scrollable-tab-view](https://github.com/ptomasroos/react-native-scrollable-tab-view)

* 数据存储  [react-native-storage](https://github.com/sunnylqm/react-native-storage)

* 图标库  [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

* 启动页  [rn-splash-screen](https://github.com/mehcode/rn-splash-screen)

* cheerio jQuery核心功能实现，抓取页面信息使用 [cheerio](https://github.com/cheeriojs/cheerio)

* 选取图片&裁剪 [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)

* 集成bugly [react-native-bugly](https://github.com/walkOnly/react-native-bugly)

## Build Setup

```
// 安装依赖
1. npm install

//有五个依赖需要链接
2. react-native link react-native-vector-icons
3. react-native link react-native-image-crop-picker
4. react-native link react-native-svg
5. react-native link react-native-bugly
6. react-native link rn-splash-screen

7. react-native-image-crop-picker react-native-bugly rn-splash-screen 需要自行配置，
   详细步骤移步项目所在地址，上面都给了链接

8. 启动屏 rn-splash-screen 配置比较复杂，
   需将 /android/app/src/main/res/ 中的三个drawable文件夹拷贝到rn-splash-screen中的res目录下，
   然后自行配置 styles.xml

//现在可以尝试运行了
9. react-native run-android (Android)
   react-native run-ios (iOS)

```
```

//如果上述尝试不成功，请手动新建一个新项目，然后将文件一点点集成进来

//新建 React Native 项目
1. react-native init jlulife && cd jlulife

//先尝试将空项目跑起来
2. react-native run-android (Android)
   react-native run-ios (iOS)

//将文件集成进来
3. 拷贝或覆盖 /App /src /index.js /app.js /package.json /package-lock.json /yarn.lock 到项目中

4.现在再执行上面的步骤，应该可以运行起来了~

```
