class CreateTeacherPrizes < ActiveRecord::Migration[4.2]
  def change
    create_table :teacher_prizes do |t|
      t.references :prize_provider,   null: false, index: true
      t.string :code,                 null: false
      t.references :user,             index: true

      t.timestamps
    end
  end
end
