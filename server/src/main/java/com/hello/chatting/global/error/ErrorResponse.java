package com.hello.chatting.global.error;

import static com.hello.chatting.global.error.ErrorCode.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.BindingResult;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

public record ErrorResponse(
	String message,
	int status,
	List<FieldError> errors
) {
	public static ErrorResponse of(ErrorCode errorCode, BindingResult bindingResult) {
		List<FieldError> fieldErrors = FieldError.of(bindingResult);
		return new ErrorResponse(errorCode.getMessage(), errorCode.getStatus(), fieldErrors);
	}

	public static ErrorResponse of(ErrorCode errorCode) {
		return new ErrorResponse(errorCode.getMessage(), errorCode.getStatus(), new ArrayList<>());
	}

	public static ErrorResponse of(ErrorCode code, List<FieldError> errors) {
		return new ErrorResponse(code.getMessage(), code.getStatus(), errors);
	}

	public static ErrorResponse of(MethodArgumentTypeMismatchException e) {
		String value = e.getValue() == null ? "" : e.getValue().toString();
		List<FieldError> errors = FieldError.of(e.getName(), value, e.getErrorCode());
		return new ErrorResponse(
			INVALID_TYPE_VALUE.getMessage(),
			INVALID_TYPE_VALUE.getStatus(),
			errors
		);
	}
}

