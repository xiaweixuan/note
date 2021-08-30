

## react native

### 项目启动

在电脑装有`node10`、`python2*`、`sdk`、`jdk`、`gradle`、`nox`的环境下

* 直接使用`npx react-native init AwesomeProject `,也可以先下载脚手架`npm -g install react-native-cli`,然后安装项目`react-native  init AwesomeProject ` 
* 确保在`nox`的`bin`目录下的`nox_adb version`与全局下的`adb version`是一个版本，如不是，则复制过去
* 在命令行输入 `nox_adb connect 127.0.01：62001`
* 在命令行输入 `adb devices`
* 进入项目中打包，`react-native run-android` ,并输入`npm start`
* 打开`nox`模拟器，在`setting`中设置`IP`为`172.17.100.2：8081`
* 重启模拟器

再次启动时，直接运行`npm start`然后打开模拟器上的`apk`就可以了

### 样式

```jsx
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
        <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

```





### 常见标签

View

> 创建 UI 时最基础的组件，直接对应一个平台的原生视图，IOS中的 UIView、Android中的android.view和Web中的div等

Text

> - 一个用于显示文本的 RN 组件，支持嵌套、样式，以及触摸处理，可继承样式
> - `<Text>`元素在布局上不同于其它组件：在Text内部的元素不再使用flexbox布局，而是采用文本布局。

Image

> 用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、base64图片等。

```JSx
export default class DisplayAnImage extends Component {
  render() {
    return (
      <View>
        <Image
          source={require('../assets/logo.png')}
        />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
        <Image
          style={{width: 66, height: 58}}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
        />
      </View>
    );
  }
}

```

> ### 属性：resizeMode
>
> 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小。默认值为`cover`。
>
> - `cover`: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸（如果容器有 padding 内衬的话，则相应减去）。
> - `contain`: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸（如果容器有 padding 内衬的话，则相应减去）。**译注**：这样图片完全被包裹在容器中，容器中可能留有空白。
> - `stretch`: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。
> - `repeat`: 重复平铺图片直到填满容器。图片会维持原始尺寸，但是当尺寸超过容器时会在保持宽高比的前提下缩放到能被容器包裹。
> - `center`: 居中不拉伸。

ImageBackground

> 添加背景色，必须指定 width 和 height，通过 source 属性指定 背景图片

```jsx
 <ImageBackground 
     source={...} 
     style={{width: '100%', height: '100%'}}
 >
    <Text>Inside</Text>
 </ImageBackground>
```

TextInput

> - 用户在应用中通过键盘输入文本的基本组件,必须通过 onChangeText事件来读取用户的输入
> - value
> - onChangeText
> - onSubmitEditing
> - onFocus

ScrollView

> 封装了平台的ScrollView（滚动视图）的组件

Button

> 跨平台的按钮组件

```jsx
<Button
  onPress={()=>{}}
  title="按钮"
  color="#841584"
/>
```

TouchableOpacity

> 不透明度会变化的按钮

FlatList

> 高性能的简单列表组件

```jsx
<FlatList
    data={[{key: 'a'}, {key: 'b'}]}
    numColumns={2} //水平多少个元素
    initialNumToRender={6} //每次加载多少个
    onRefresh={()=>{}} //下拉刷新
    refreshing={false} //下拉刷新时的加载样式，此处应手动更改，在触发下拉加载时将值改为true，加载完成后改为false
    onEndReached={()=>{}} //上拉加载
    onEndReachedThreshold:10 //距离底部多少距离触发上拉下载函数
    renderItem={({item}) => <Text>{item.key}</Text>}
/>
```

SectionList

> 高性能的简单列表组件，在每组数据上方可以加一个表头样式（自定义标签）

StatusBar

状态栏

```html
<StatusBar
   animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
   hidden={false}  //是否隐藏状态栏。  
   backgroundColor={'red'} //状态栏的背景色  
   translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
    barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')   
            >
</StatusBar>
```



### 路由

安装

```shell
yarn add react-native-router-flux
```



切换路由后，之前的路由在状态会保存。

```html
<!--App组件中-->
<Router>
      <Scene key="root">
        <Scene key="msg" component={Msg}/>   ## 默认页
          <Scene key="doc" title="文档" titleStyle={{}} renderRightButton={} component={Doc}/>
      </Scene>
</Router>

<!--Msg组件中-->
<Button title="跳到Doc" onPress={()=>Actions.doc({count:1})/>
<!--Doc组件-->
<view>
	<Text>{{this.props.count}}</Text>
</view>

```

我们也可以实现tab栏

```jsx
<Router>
      <Scene key="root">
        <Tabs key="tabbar" hideNavBar activeTintColor="red">
        	<Scene key="msg" title="消息" icon={()=><Image/>}>
            	<Scene key="msgs" component={Msg}/>
                <Scene key="msgsDetail" component={MsgDetail} hideTabbar/>
            </Scene>
        	<Scene key="doc" title="文档">
            	<Scene  key="docs" component={Doc}/>
            </Scene>
        </Tabs>
      </Scene>
</Router>

```

#### Tabs 功能

```html
...
import { Tabs } from 'react-native-router-flux';

//设置tab选中时的字体颜色和标题
const TabIcon = ({focused , title}) => {
  return (
    <Text 
        style={{color: focused  ? 'blue' : 'black'}}
    >
          {title}
    </Text>
  );
};
 
const Root = () => {
  return (
      <Router>
        <Scene hideNavBar>
          <Tabs
            key="tabbar"
            // 是否显示标签栏文字
            showLabel={false}
            tabBarStyle={{backgroundColor: "#eee"}}
            //tab选中的颜色
            activeBackgroundColor="white"
            //tab没选中的颜色
            inactiveBackgroundColor="red"
          >
            <Scene
              key="one"
              icon={TabIcon}
              component={PageOne}
              title="PageOne"
            />

            <Scene
              key="two"
              component={PageTwo}
              title="PageTwo"
              icon={TabIcon}
            />

            <Scene
              key="three"
              component={PageThree}
              title="PageThree"
              icon={TabIcon}
            />
          </Tabs>
      </Scene>
  </Router>)
};
```

#### Drawer

侧边栏

```html
<Drawer
    key="drawer"
    drawerPosition="left/right"
    drawerImage={图片源}
    drawerIcon={}
    contentComponent={DrawerContent}
	drawerWidth={400}
    hideDrawerButton
>
    <Tabs></Tabs>
</Drawer>
```

#### Lightbox

路由转跳从下方出现

```html
<Router>
  <Lightbox>
    <Scene key="root">
      ...
    </Scene>
    <Scene key="light_box" component={MyLightbox} />
  </Lightbox>
</Router>
```

#### Modal

路由转跳以整个新页面的形式

```html
<Router>
  <Modal>
    <Scene key="root">
      ...
    </Scene>
    <Scene key="statusModal" component={StatusModal} />
    <Scene key="errorModal" component={ErrorModal} />
    <Scene key="loginModal" component={LoginModal} />
  </Modal>
</Router>
```

#### Actions

- [key] : Actions.key( ) or Actions[key].call( )
- pop( )
- replace( )
- refresh( )
- reset( )
- currentScene: 返回当前的 Scene
- drawerOpen
- drawerClose

### 第三方组件

#### ActivityIndicator

```html
<ActivityIndicator size="large" color="#0000ff" />
```

#### Animated

> 创建动画
>
> 使用组件前加Animated

```javascript
//1. 创建样式初始值
this.state = {
    	opacity: new Animated.Value(0)
}
//2.定时样式值变化
Animated.timing(
  // timing方法使动画值随时间变化
  this.state.opacity, // 要变化的动画值
  {
    	toValue: 1, // 最终的动画值
      	duration: 500,
      	delay: 0
  },
).start( callback ); // 动画完成后可调用 callback 
// *timing可以换成spring，有反弹效果动画
```

#### WebView

> 

```html
yarn add react-native-webview
react-native link react-native-webview

import { WebView } from 'react-native-webview';

<WebView source={{ uri: 'https://www.baidu.com' }} />;
```

#### [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker)

> 打开摄像机功能

- 安装并 link

```shell
yarn add react-native-image-picker

react-native link react-native-image-picker
```

- 在 `android\app\src\main\AndroidManifest.xml` 添加

```html
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

- 在 `android\app\src\main\Java\com\projectname\MainActivity` 中添加

```javascript
//开头
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import

// MainActivity 中添加
 private PermissionListener listener;
```

- 使用

```
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        console.log('Error:', response.error);
      } else if (response.customButton) {
        console.log('custom:', response.customButton);
      } else {
          
        const source = { uri: response.uri };
        this.setState({
          avatarSource: source,
        });
      }
    });

<Image source={this.state.avatarSource} style={{width:200,height:200}} />
```

#### [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)

```
yarn add react-native-image-crop-picker
react-native link react-native-image-crop-picker

ImagePicker.openCamera({
  width: 300,
  height: 400,
  cropping: true,
}).then(image => {
  this.setState({imgUrl:image.path})
});
```

#### [react-native-button](https://github.com/ide/react-native-button)

```
yarn add react-native-button

import Button from 'react-native-button';

<Button 
    style={{
        width:100,height: 40,
        borderRadius: 20,
        textAlignVertical: 'center',
        backgroundColor:'red',
        color: '#fff'
    }}
>文本</Button>
```

#### [react-native-message-bar](https://github.com/KBLNY/react-native-message-bar)

```
yarn add react-native-message-bar

import React from 'react';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

export default class extends React.Component {
  componentDidMount() {
  MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }
    
  render() {
    return <MessageBar ref="alert" />;
  }
}
```

### [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

[图标地址](https://oblador.github.io/react-native-vector-icons/)

```
 //1. 安装
yarn add react-native-vector-icons
 //2. link，执行完在 项目\android\app\src\main\assets\fonts 文件夹下会多出 ttf 格式的图标文件
react-native link react-native-vector-icons
 //3. 卸载 App，重新 react-native run-android
 //4. 引入 Icon 组件，注意后面的 / ,后面是哪个文件，将来就在 图标地址 哪一栏找图标名字
import Icon from 'react-native-vector-icons/FontAwesome';

<Icon name="rocket" size={30} color="#900" />;
```

#### [react-native-swiper](https://github.com/leecade/react-native-swiper)

```
yarn add react-native-swiper@nightly

import Swiper from 'react-native-swiper';

<Swiper style={styles.wrapper} showsButtons={true}>
    <View style={styles.slide1}>
        <Text style={styles.text}>Hello Swiper</Text>
    </View>
    <View style={styles.slide2}>
        <Text style={styles.text}>Beautiful</Text>
    </View>
    <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
    </View>
</Swiper>
```

### 尺寸

* px：图片中最小的一格

* dpi（dot per inch）：每英寸上有多少个小格，格越多越清晰

* dp：安卓开发中使用的单位。1dp=像素密度为160dpi时1px的大小

```javascript
const {width,height,scale} = Dimensions.get('window')
/*
width屏幕宽度
height屏幕高度
scale像素密度与160的比值，例如在320dpi的像素密度下，1dp=2px
*/
```

### 布局技巧

弹性盒子

```css
/*父组件中*/
{
    flexDirection:'row', /*使子元素横向布局*/
    justifyContent:'space-evenly'/*间隔均分*/
}
```

元素居中

```css
{
    alignItems:"center"/*垂直居中*/
    justifyContent:'space-evenly'/*当空间只有一个元素时，水平居中*/
}
```

横排元素超出换行

```javascript
{
	flexWarp:'wrap'
}
```

返回键设置

```javascript
  BackHandler.addEventListener('back', () => {
    console.log(tag)
    if (tag) BackHandler.exitApp();//使用该方法退出app
    tag = true;
    setTimeout(() => {
      tag = false
    }, 1000)
    return true;//当返回为true时，按返回键不会退出

  })
```



### 本地存储

`AsyncStorage`组件用法

```javascript
AsyncStorage.setItem('userName':'helloword',()=>{/*回调函数*/})//存储键值对
AsyncStorage.setItem('userName').then((res)=>console.log(res))//返回一个promise
```



### 打包

1、生成一个签名密钥

```
 keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

> 这条命令会要求你输入密钥库（`keystore`）和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一个叫做`my-release-key.keystore`的密钥库文件。
>
> 在运行上面这条语句之后，密钥库里会生成一个单独的密钥，有效期为 10000 天。--alias 参数后面的别名将来为应用签名时需要用到，所以必须记住这个别名。

2、设置 `gradle` 变量

> 1. 把`my-release-key.keystore`文件放到你工程中的`android/app`文件夹下
>
> 2. 编辑项目目录`/android/gradle.properties`，加上如下代码
>
>    ```
>    MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
>    MYAPP_RELEASE_KEY_ALIAS=my-key-alias
>    MYAPP_RELEASE_STORE_PASSWORD=*****
>    MYAPP_RELEASE_KEY_PASSWORD=*****
>    ```

3、把签名配置加入到项目的 `gradle` 配置中

> 编辑项目目录下的`android/app/build.gradle`，添加如下签名配置：
>
> ```
> ...
> android {
>  ...
>  defaultConfig { ... }
>  signingConfigs {
>      release {
>          if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
>              storeFile file(MYAPP_RELEASE_STORE_FILE)
>              storePassword MYAPP_RELEASE_STORE_PASSWORD
>              keyAlias MYAPP_RELEASE_KEY_ALIAS
>              keyPassword MYAPP_RELEASE_KEY_PASSWORD
>          }
>      }
>  }
>  buildTypes {
>      release {
>          ...
>          signingConfig signingConfigs.release
>      }
>  }
> }
> ...
> ```

4、生成发行` APK` 包

> 进到项目的 android 目录，执行如下命令
>
> ```
> ./gradlew assembleRelease
> ```

5、更换 logo 图标

> 将项目` android\app\src\main\res`下的文件夹中图片都换掉，重新打包即可。
>
> 可用如下地址生成各个尺寸的图片。
>
> 地址：https://icon.wuruihong.com/

6、更换项目名称

> 将项目目录下的 `android\app\src\main\res\values` 中的 `strings.xml` 中的名称改掉即可

### 配置ts环境

- 使用 `TypeScript` 模板创建新项目

```
react-native init MyApp --template react-native-template-typescript
```

- 现有项目添加 TypeScript

  1. ```
     yarn add --dev typescript @types/jest @types/react @types/react-native @types/react-test-renderer
     ```

  2. 在项目根目录下创建一个 TypeScript 配置文件（**tsconfig.json**）

     ```
     {
       "compilerOptions": {
         "allowJs": true,
         "allowSyntheticDefaultImports": true,
         "esModuleInterop": true,
         "isolatedModules": true,
         "jsx": "react",
         "lib": ["es6"],
         "moduleResolution": "node",
         "noEmit": true,
         "strict": true,
         "target": "esnext"
       },
       "exclude": [
         "node_modules",
         "babel.config.js",
         "metro.config.js",
         "jest.config.js"
       ]
     }
     ```

  3. 在项目根目录创建一个**jest.config.js**文件

     ```
     module.exports = {
       preset: 'react-native',
       moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
     };
     ```

  4. 重命名一个 JavaScript 文件为 ***.tsx**







