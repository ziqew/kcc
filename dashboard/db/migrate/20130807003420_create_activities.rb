class CreateActivities < ActiveRecord::Migration[4.2]
  def change
    create_table :activities do |t|
      t.references :user, :level
      t.string :action
      t.string :data
      t.string :url

      t.timestamps
    end
  end
end
