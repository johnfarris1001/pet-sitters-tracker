class Pet < ApplicationRecord
    has_many :appointments
    has_many :sitters, through: :appointments
end
