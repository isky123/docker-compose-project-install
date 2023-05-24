1.安装（地址：https://gofrp.org/docs/setup/）
frpc压缩包拷贝到内网服务所在的机器上，将frps拷贝到具有公网 IP 的机器上，放置在任意目录。


2.公网IP机器上部署frps，修改 frps.ini 文件（示例）:
[common]
#服务端和客户端通讯端口
bind_port = 30007 
#网站访问的端口，例如：http://xxx.com:9008
vhost_http_port = 30008

# 授权码，请改成更复杂的
token = A+LAD)vjpanZ;%T


# frp管理后台端口，请按自己需求更改
dashboard_port = 30009
# frp管理后台用户名和密码，请改成自己的
dashboard_user = zhangdongsheng
dashboard_pwd = A+LAD)vjpanZ;%T
enable_prometheus = true

# frp日志配置
log_file = /var/log/frps.log
log_level = info
log_max_days = 3

3.客户端(内网)机器上（SSH 服务通常监听在22端口）部署 frpc，修改 frpc.ini 文件(示例)：
[common]
#公网服务器IP地址
server_addr = 8.140.173.90
#和公网服务器的通信端口与之对应
server_port = 30007
token = A+LAD)vjpanZ;%T

[yun-bj-4]
type = tcp
#local_ip和local_port是本地需要暴露到公网的服务器地址和端口
local_ip = 10.15.11.4
local_port = 22
#remote_port 表示在 frp 服务端监听的端口，访问此端口的流量将会被转发到本地服务对应的端口。frp会为本地服务的22端口，在frps所在的服务端监听30036端口，将30036端口接收到的连接和本地服务的22 端口关联，透传流量，从而实现让用户在外部访问到内部服务。
remote_port = 30036

[gitlab-bj-57-http]
type = tcp
#公司gitlab服务器，local_ip和local_port是本地需要暴露到公网的服务器地址和端口
local_ip = 10.16.201.57
local_port = 7964
remote_port = 30025

4.分别启动 frps 和 frpc

5.通过 SSH 访问内网机器，假设用户名为 root
ssh -oPort=30036 root@8.140.173.90（或者ssh -p30036 root@8.140.173.90， frp会将请求8.140.173.90:30036的流量转发到内网机器的22 端口）

frp 会将请求 x.x.x.x:6000 的流量转发到内网机器的 22 端口
