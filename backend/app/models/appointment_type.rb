class AppointmentType < ApplicationRecord
    has_many :appointments, dependent: :restrict_with_error
    
    validates :name, presence: true
    validates :color, presence: true
end
