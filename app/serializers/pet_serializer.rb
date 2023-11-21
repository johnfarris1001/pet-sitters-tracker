class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :breed, :weight, :age, :notes

  has_many :appointments
end
