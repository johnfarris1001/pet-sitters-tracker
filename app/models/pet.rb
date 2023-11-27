class Pet < ApplicationRecord
    validates :name, presence: true
    validates :species, inclusion: { in: ['Cat', 'Dog']}
    validates :weight, presence: true, numericality: { only_integer: true }

    has_many :appointments, dependent: :destroy
    has_many :sitters, through: :appointments
    belongs_to :user

    def unique_sitters
        self.sitters.uniq
    end
end
