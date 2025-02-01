---
title: Проверка версии байткода зависимостей при сборке maven
date: 2025-02-01 18:16:16 +/-TTTT
categories: [Java]
tags: [java, maven]
---
<!--excerpt-->
Настройка плагина maven-enforcer-plugin

```xml
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-enforcer-plugin</artifactId>
	<version>3.3.0</version>
	<executions>
		<execution>
			<id>enforce-bytecode-version</id>
			<goals>
				<goal>enforce</goal>
			</goals>
			<configuration>
				<rules>
					<enforceBytecodeVersion>
						<maxJdkVersion>1.8</maxJdkVersion>
					</enforceBytecodeVersion>
				</rules>
				<fail>true</fail> # Падать при наличии зависимостей с версией байткода выше значения из maxJdkVersion
			</configuration>
		</execution>
	</executions>
	<dependencies>
		<dependency>
			<groupId>org.codehaus.mojo</groupId>
			<artifactId>extra-enforcer-rules</artifactId>
			<version>1.7.0</version>
		</dependency>
	</dependencies>
</plugin>
```
