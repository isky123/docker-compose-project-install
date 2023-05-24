FROM openjdk:8u212-jre
MAINTAINER Mark
# 时区问题
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

#ADD wait-for-it脚本(可以github上下载)
#ADD wait-for-it.sh /wait-for-it.sh

#ENTRYPOINT ["java", "-server", "-Xms512M", "-Xmx512M", "-Djava.security.egd=file:/dev/./urandom", "-Dfile.encoding=UTF-8", "-XX:+HeapDumpOnOutOfMemoryError", "-jar", "/app/app.jar" ]

# VOLUME 指定临时文件目录为/tmp，在主机/var/lib/docker目录下创建了一个临时文件并链接到容器的/tmp
VOLUME /tmp
# 将jar包添加到容器中并更名为rb_ms_docker.jar
ADD user-service-1.0-SNAPSHOT.jar user_ms_docker.jar
#ADD wait-for-it脚本
ADD wait-for-it.sh /wait-for-it.sh
# 运行jar包
RUN bash -c 'touch /user_ms_docker.jar'
CMD java -jar /user_ms_docker.jar
#暴露6066端口作为微服务
EXPOSE 6062

