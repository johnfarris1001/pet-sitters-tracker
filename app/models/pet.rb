class Pet < ApplicationRecord
    has_many :appointments, dependent: :destroy
    has_many :sitters, through: :appointments
    belongs_to :user
end
