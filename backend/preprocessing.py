# preprocessing of Angular project
import os
import shutil


class PreProcessing:
  def clear_floder(self):
    root_path = os.getcwd()
    print(root_path)
    target_floder = ['static', 'templates']
    for i in range(len(target_floder)):
      try:
        shutil.rmtree(os.path.join(root_path, 'backend\\'+ target_floder[i]))
      except OSError as e:
        print(e)
      else:
          print("The directory is deleted successfully")




