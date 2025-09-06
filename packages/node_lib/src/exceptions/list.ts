import { HTTPException } from './http_exception.js'

export class OkException extends HTTPException {
  static status = 200
  static code = 'E_OK'
  static message = 'The request was successful'
}

export class MovedPermanentlyException extends HTTPException {
  static status = 301
  static code = 'E_MOVED_PERMANENTLY'
  static message = 'The requested resource has been moved permanently'
}

export class FoundException extends HTTPException {
  static status = 302
  static code = 'E_FOUND'
  static message = 'The requested resource was found'
}

export class SeeOtherException extends HTTPException {
  static status = 303
  static code = 'E_SEE_OTHER'
  static message = 'The requested resource can be found under a different URI'
}

export class NotModifiedException extends HTTPException {
  static status = 304
  static code = 'E_NOT_MODIFIED'
  static message = 'The requested resource has not been modified'
}

export class TemporaryRedirectException extends HTTPException {
  static status = 307
  static code = 'E_TEMPORARY_REDIRECT'
  static message = 'The requested resource can be found temporarily under a different URI'
}

export class PermanentRedirectException extends HTTPException {
  static status = 308
  static code = 'E_PERMANENT_REDIRECT'
  static message = 'The requested resource can be found permanently under a different URI'
}

export class BadRequestException extends HTTPException {
  static status = 400
  static code = 'E_BAD_REQUEST'
  static message = 'The request was malformed or invalid'
}

export class UnauthorizedException extends HTTPException {
  static status = 401
  static code = 'E_UNAUTHORIZED'
  static message = 'Authentication is required to access the requested resource'
}

export class PaymentRequiredException extends HTTPException {
  static status = 402
  static code = 'E_PAYMENT_REQUIRED'
  static message = 'Payment is required to access the requested resource'
}

export class ForbiddenException extends HTTPException {
  static status = 403
  static code = 'E_FORBIDDEN'
  static message = 'The server understood the request, but is refusing to fulfill it'
}

export class NotFoundException extends HTTPException {
  static status = 404
  static code = 'E_NOT_FOUND'
  static message = 'The requested resource was not found'
}

export class MethodNotAllowedException extends HTTPException {
  static status = 405
  static code = 'E_METHOD_NOT_ALLOWED'
  static message =
    'The method specified in the request is not allowed for the resource identified by the URI'
}

export class NotAcceptableException extends HTTPException {
  static status = 406
  static code = 'E_NOT_ACCEPTABLE'
  static message =
    'The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request'
}

export class ProxyAuthenticationRequiredException extends HTTPException {
  static status = 407
  static code = 'E_PROXY_AUTHENTICATION_REQUIRED'
  static message = 'The client must first authenticate itself with the proxy'
}

export class RequestTimeoutException extends HTTPException {
  static status = 408
  static code = 'E_REQUEST_TIMEOUT'
  static message =
    'The client did not produce a request within the time that the server was prepared to wait'
}

export class ConflictException extends HTTPException {
  static status = 409
  static code = 'E_CONFLICT'
  static message =
    'The request could not be completed due to a conflict in the state of the resource'
}

export class GoneException extends HTTPException {
  static status = 410
  static code = 'E_GONE'
  static message = 'The requested resource is no longer available and will not be available again'
}

export class LengthRequiredException extends HTTPException {
  static status = 411
  static code = 'E_LENGTH_REQUIRED'
  static message = 'The server refuses to accept the request without a defined Content-Length'
}

export class PreconditionFailedException extends HTTPException {
  static status = 412
  static code = 'E_PRECONDITION_FAILED'
  static message =
    'One or more preconditions given in the request header fields evaluated to false when tested on the server'
}

export class PayloadTooLargeException extends HTTPException {
  static status = 413
  static code = 'E_PAYLOAD_TOO_LARGE'
  static message = 'The request entity is larger than the server is willing or able to process'
}

export class UriTooLongException extends HTTPException {
  static status = 414
  static code = 'E_URI_TOO_LONG'
  static message = 'The URI provided was too long for the server to process'
}

export class UnsupportedMediaTypeException extends HTTPException {
  static status = 415
  static code = 'E_UNSUPPORTED_MEDIA_TYPE'
  static message =
    'The server refuses to accept the request because the media type is not supported'
}

export class RangeNotSatisfiableException extends HTTPException {
  static status = 416
  static code = 'E_RANGE_NOT_SATISFIABLE'
  static message = 'The server cannot serve the requested byte range'
}

export class ExpectationFailedException extends HTTPException {
  static status = 417
  static code = 'E_EXPECTATION_FAILED'
  static message = 'The server cannot meet the requirements of the Expect request-header field'
}

export class ImATeapotException extends HTTPException {
  static status = 418
  static code = 'E_IM_A_TEAPOT'
  static message = "I'm a teapot"
}

export class MisdirectedRequestException extends HTTPException {
  static status = 421
  static code = 'E_MISDIRECTED_REQUEST'
  static message = 'The request was directed at a server that is not able to produce a response'
}

export class UnprocessableEntityException extends HTTPException {
  static status = 422
  static code = 'E_UNPROCESSABLE_ENTITY'
  static message =
    'The request was well-formed but was unable to be followed due to semantic errors'
}

export class LockedException extends HTTPException {
  static status = 423
  static code = 'E_LOCKED'
  static message = 'The resource that is being accessed is locked'
}

export class FailedDependencyException extends HTTPException {
  static status = 424
  static code = 'E_FAILED_DEPENDENCY'
  static message = 'The request failed due to failure of a previous request'
}

export class TooEarlyException extends HTTPException {
  static status = 425
  static code = 'E_TOO_EARLY'
  static message = 'The server is unwilling to risk processing a request that might be replayed'
}

export class UpgradeRequiredException extends HTTPException {
  static status = 426
  static code = 'E_UPGRADE_REQUIRED'
  static message =
    'The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol'
}

export class PreconditionRequiredException extends HTTPException {
  static status = 428
  static code = 'E_PRECONDITION_REQUIRED'
  static message = 'The origin server requires the request to be conditional'
}

export class TooManyRequestsException extends HTTPException {
  static status = 429
  static code = 'E_TOO_MANY_REQUESTS'
  static message = 'The user has sent too many requests in a given amount of time'
}

export class RequestHeaderFieldsTooLargeException extends HTTPException {
  static status = 431
  static code = 'E_REQUEST_HEADER_FIELDS_TOO_LARGE'
  static message =
    'The server is unwilling to process the request because the header fields are too large'
}

export class UnavailableForLegalReasonsException extends HTTPException {
  static status = 451
  static code = 'E_UNAVAILABLE_FOR_LEGAL_REASONS'
  static message = 'The server is denying access to the resource as a consequence of a legal demand'
}

export class InternalServerErrorException extends HTTPException {
  static status = 500
  static code = 'E_INTERNAL_SERVER_ERROR'
  static message =
    'The server encountered an unexpected condition that prevented it from fulfilling the request'
}

export class NotImplementedException extends HTTPException {
  static status = 501
  static code = 'E_NOT_IMPLEMENTED'
  static message = 'The server does not support the functionality required to fulfill the request'
}

export class BadGatewayException extends HTTPException {
  static status = 502
  static code = 'E_BAD_GATEWAY'
  static message =
    'The server, while acting as a gateway or proxy, received an invalid response from an upstream server'
}

export class ServiceUnavailableException extends HTTPException {
  static status = 503
  static code = 'E_SERVICE_UNAVAILABLE'
  static message =
    'The server is currently unable to handle the request due to a temporary overload or scheduled maintenance'
}

export class GatewayTimeoutException extends HTTPException {
  static status = 504
  static code = 'E_GATEWAY_TIMEOUT'
  static message =
    'The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server'
}

export class HttpVersionNotSupportedException extends HTTPException {
  static status = 505
  static code = 'E_HTTP_VERSION_NOT_SUPPORTED'
  static message = 'The server does not support the HTTP protocol version used in the request'
}

export class VariantAlsoNegotiatesException extends HTTPException {
  static status = 506
  static code = 'E_VARIANT_ALSO_NEGOTIATES'
  static message =
    'The server has an internal configuration error: the selected variant resource is engaging in transparent content negotiation itself, and is therefore not a suitable end point for the negotiation process'
}

export class InsufficientStorageException extends HTTPException {
  static status = 507
  static code = 'E_INSUFFICIENT_STORAGE'
  static message = 'The server is unable to store the representation needed to complete the request'
}

export class LoopDetectedException extends HTTPException {
  static status = 508
  static code = 'E_LOOP_DETECTED'
  static message = 'The server detected an infinite loop while processing the request'
}

export class NotExtendedException extends HTTPException {
  static status = 510
  static code = 'E_NOT_EXTENDED'
  static message = 'The server requires further extensions to the request to fulfill it'
}

export class NetworkAuthenticationRequiredException extends HTTPException {
  static status = 511
  static code = 'E_NETWORK_AUTHENTICATION_REQUIRED'
  static message = 'The client needs to authenticate to gain network access'
}

export class TemporaryInternalServerException extends HTTPException {
  static status = 520
  static code = 'E_TEMPORARY_INTERNAL_SERVER_ERROR'
  static message = 'The server encountered an temporary internal server error'
}
