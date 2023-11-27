class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :breed, :weight, :age, :notes, :unique_sitters

  has_many :appointments
  has_many :sitters
end
