class Sitter < ApplicationRecord
    validates :name, presence: true

    has_many :appointments, dependent: :destroy
    has_many :pets, through: :appointments
end
