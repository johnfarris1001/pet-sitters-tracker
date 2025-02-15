class Sitter < ApplicationRecord
    validates :name, presence: true
    validates :phone_number, presence: true
    validates :address, presence: true

    has_many :appointments, dependent: :destroy
    has_many :pets, through: :appointments

    def unique_pets
        self.pets.uniq
    end
end
