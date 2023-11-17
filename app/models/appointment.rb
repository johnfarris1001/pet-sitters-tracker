class Appointment < ApplicationRecord
    validates :category, inclusion: { in: ["Drop-in 1/2-hr", "Drop-in 1-hr", "House Sit", "Walk 1/2-hr", "Walk 1-hr", "Boarding", "Grooming", "Play Date"]}

    belongs_to :pet
    belongs_to :sitter
    belongs_to :user
end
