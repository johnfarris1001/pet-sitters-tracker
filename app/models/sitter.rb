class Sitter < ApplicationRecord
    validates :name, presence: true
    validates :phone_number, :presence: true
    validates :address, :presences: true

    has_many :appointments, dependent: :destroy
    has_many :pets, through: :appointments
end
