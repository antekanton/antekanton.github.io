---
title: Проверка версии байткода зависимостей при сборке maven
date: 2025-02-01 18:16:16 +0700
categories: [Java]
tags: [java, maven]
---

Заметка о наболевшем в Java. 
В случае использования в проектах технологии JSP нужно либо выполнять компиляцию JSP страниц на этапе сборки проекта или проверять плагином версии всех зависимостей. 
Иначе велик риск получить падающие страницы в проде из-за высокой версии байткода зависимостей, которые не может прожевать старая версия JVM.

### Настройка плагина maven-enforcer-plugin для подобной проверки

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
				<fail>true</fail>
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
- maxJdkVersion - максимальная версия байткода, которую поддерживает JVM проекта
- fail - падать при превышении версий
