class RemoveUserTypeDefault < ActiveRecord::Migration[4.2]
  def change
    User.connection.execute('alter table users modify user_type varchar(16)')
  end
end
