class AddSolutionsForArtistLevels < ActiveRecord::Migration[4.2]
  def change
    Artist.where(ideal_level_source_id: nil).each do |artist_level|
      artist_level.update_ideal_level_source
      artist_level.save!
    end
  end
end
