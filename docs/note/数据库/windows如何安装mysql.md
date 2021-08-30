在[mysql下载地址](https://dev.mysql.com/downloads/mysql/)下载mysql压缩包，解压到文件中（例如安装到c:\mysql）。
进入c:\mysql中，创建my.ini文件像文件中加入

```
[client]
# 设置mysql客户端默认字符集
default-character-set=utf8
 
[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=C:\\mysql
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
# datadir=C:\\mysql\\sqldata
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

然后以管理员身份打开cmd并进入C:\\mysql\bin中(初始化)
```shell
mysqld.exe --initialize --console
```
执行后出现`root@localhost：`后面加的是原始密码

然后继续以管理员身份执行 (创建服务)
```shell
.\mysqld.exe install
```
启动服务
```shell
net start mysql
```