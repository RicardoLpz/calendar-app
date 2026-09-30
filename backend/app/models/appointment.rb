class Appointment < ApplicationRecord
  belongs_to :appointment_type
  
  validates :description, presence: true
  validates :appointment_type, presence: true

  after_initialize :set_default_atendee, if: :new_record?

  private

  def set_default_atendee
    self.atendee ||= []
  end

end
