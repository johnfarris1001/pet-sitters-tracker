class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :breed, :weight, :age, :notes
end
