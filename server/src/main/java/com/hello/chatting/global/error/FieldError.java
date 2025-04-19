package com.hello.chatting.global.error;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.BindingResult;

public record FieldError(
	String field,
	String value,
	String reason
) {

	public static List<FieldError> of(String field, String value, String reason) {
		List<FieldError> fieldErrors = new ArrayList<>();
		fieldErrors.add(new FieldError(field, value, reason));
		return fieldErrors;
	}

	public static List<FieldError> of(BindingResult bindingResult) {
		final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();
		return fieldErrors.stream()
			.map(error -> new FieldError(
				error.getField(),
				error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(),
				error.getDefaultMessage()
			)).toList();
	}

}

