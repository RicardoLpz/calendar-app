class Appointment < ApplicationRecord
  belongs_to :appointment_type
  
  validates :description, presence: true
  validates :appointment_type, presence: true
end
