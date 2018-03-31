class CreatePrizes < ActiveRecord::Migration[4.2]
  def change
    create_table :prizes do |t|
      t.references :prize_provider,   null: false, index: true
      t.string :code,                 null: false
      t.references :user,             index: true

      t.timestamps
    end
  end
end
