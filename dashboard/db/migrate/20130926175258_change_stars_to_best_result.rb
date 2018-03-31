class ChangeStarsToBestResult < ActiveRecord::Migration[4.2]
  def change
    remove_column :activities, :stars
    remove_column :user_levels, :stars
    add_column :activities, :test_result, :integer
    add_column :user_levels, :best_result, :integer
  end
end
