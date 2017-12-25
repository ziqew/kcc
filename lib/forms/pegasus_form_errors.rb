class FormError < ArgumentError
  attr_reader :errors

  def self.detect_errors(data)
    errors = {}
    data.each_pair do |key, value|
      errors[key] = [value.message] if value.class == FieldError
    end
    errors
  end

  def initialize(kind, errors, logger = nil)
    @kind = kind
    @errors = errors

    logger.warn "FormError[#{@kind}]: #{@errors.to_json}" if logger
  end
end

class FieldError
  attr_accessor :value, :message

  def initialize(value, message)
    @value = value
    @message = message
  end
end
