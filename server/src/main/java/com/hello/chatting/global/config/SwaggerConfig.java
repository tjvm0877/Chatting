package com.hello.chatting.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@SecurityScheme(
	name = "Authorization",
	type = SecuritySchemeType.HTTP,
	scheme = "bearer",
	bearerFormat = "JWT",
	description = "JWT access token을 입력하세요."
)
@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI openAPI() {
		Info info = new Info()
			.title("Spring Boot 3.4.x API Document")
			.version("v1.0.0")
			.description("Spring Boot 3.4.x API 명세서입니다.");

		return new OpenAPI()
			.components(new Components())
			.info(info);
	}
}
