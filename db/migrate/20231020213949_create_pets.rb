class CreatePets < ActiveRecord::Migration[6.1]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :species
      t.string :breed
      t.integer :weight
      t.integer :age
      t.text :notes

      t.timestamps
    end
  end
end
