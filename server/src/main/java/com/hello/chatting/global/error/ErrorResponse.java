package com.hello.chatting.global.error;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.validation.BindingResult;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.hello.chatting.global.error.exception.ErrorCode;

public record ErrorResponse(
	String message,
	int status,
	List<FieldError> errors
) {
	public static ErrorResponse of(final ErrorCode code, final BindingResult bindingResult) {
		return new ErrorResponse(
			code.getMessage(),
			code.getStatus(),
			FieldError.of(bindingResult)
		);
	}

	public static ErrorResponse of(final ErrorCode code) {
		return new ErrorResponse(
			code.getMessage(),
			code.getStatus(),
			List.of()
		);
	}

	public static ErrorResponse of(final ErrorCode code, final List<FieldError> errors) {
		return new ErrorResponse(
			code.getMessage(),
			code.getStatus(),
			errors
		);
	}

	public static ErrorResponse of(MethodArgumentTypeMismatchException e) {
		final String value = e.getValue() == null ? "" : e.getValue().toString();
		final List<FieldError> errors = FieldError.of(e.getName(), value, e.getErrorCode());
		return new ErrorResponse(
			ErrorCode.INVALID_TYPE_VALUE.getMessage(),
			ErrorCode.INVALID_TYPE_VALUE.getStatus(),
			errors
		);
	}

	public record FieldError(
		String field,
		String value,
		String reason
	) {
		public static List<FieldError> of(final String field, final String value, final String reason) {
			return List.of(new FieldError(field, value, reason));
		}

		public static List<FieldError> of(final BindingResult bindingResult) {
			return bindingResult.getFieldErrors().stream()
				.map(error -> new FieldError(
					error.getField(),
					error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(),
					error.getDefaultMessage()))
				.collect(Collectors.toList());
		}
	}
}
