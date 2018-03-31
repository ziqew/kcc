class AddIndexToLevelSourceImages < ActiveRecord::Migration[4.2]
  def change
    add_index :level_source_images, :level_source_id
  end
end
