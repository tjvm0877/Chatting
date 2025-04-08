package com.hello.chatting.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hello.chatting.domain.chat.application.ChatService;
import com.hello.chatting.global.jwt.JwtProvider;
import com.hello.chatting.global.websocket.CustomMessageBroker;
import com.hello.chatting.global.websocket.CustomWebsocketHandler;
import com.hello.chatting.global.websocket.MessageBroker;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

	private final ObjectMapper objectMapper;
	private final JwtProvider jwtProvider;
	private final ChatService chatService;

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(customWebsocketHandler(), "/ws")
			.setAllowedOrigins("*");
	}

	@Bean
	public CustomWebsocketHandler customWebsocketHandler() {
		return new CustomWebsocketHandler(messageBroker(), objectMapper);
	}

	@Bean
	public MessageBroker messageBroker() {
		return new CustomMessageBroker(jwtProvider, chatService);
	}
}
