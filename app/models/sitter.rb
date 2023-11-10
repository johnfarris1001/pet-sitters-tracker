class Sitter < ApplicationRecord
    has_many :appointments, dependent: :destroy
    has_many :pets, through: :appointments
end
