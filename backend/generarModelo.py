import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.tree import DecisionTreeClassifier 

df = pd.read_csv("RestaurantData2.csv")

#Eliminar campos no necesarios
df = df.drop(columns=['Order_ID', 'DATE', 'ITEM', 'WEEK NUMBER', 'QUANTITY','PRICE','TOTAL'])

#Reemplazar valores numéricos por valores ordinales
df['TAKEAWAY/SEATING/PICKUP'] = df['TAKEAWAY/SEATING/PICKUP'].replace(['SEAT', 'TAKEAWAY', 'PICKUP', 'TAKEWAY'],[1,2,3,2])
df['DAY'] = df['DAY'].replace(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY','FRIDAY','SATURDAY','SUNDAY'],[1,2,3,4,5,6,7])
df['SERVER'] = df['SERVER'].replace(['JILLIAN N.', 'ASHLEY C.', 'KAITLIN E.', 'TAYLOR P', 'DEB D.', 'DEE V.', 'KELLY K.', 'HAILEY W.', 'EMMA B.', 'EMILY D.', 'ALLY K.', 'GABRIELLA M.', 'RETA D.', 'JORDYN J.', 'KAITLIN B.','BAILEY T.'],
                                    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
df['ALLERGIES'] = df['ALLERGIES'].replace(['NO', 'YES'],[0,1])
df = df.dropna()
df = df.reset_index(drop=True)
df.head()

X=df.drop('FOOD TYPE', axis=1)
y=df['FOOD TYPE']

from sklearn.tree import DecisionTreeClassifier 
from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test= train_test_split(X,y,test_size=0.2, random_state=42)
from sklearn.tree import DecisionTreeClassifier 

#Modelo usando GridSearch
#Configurando la rejilla
params = {'criterion':['gini','entropy'],
          'splitter': ['best', 'random']
          }
grid_search_cv = GridSearchCV(DecisionTreeClassifier(random_state=42), params, verbose=1,cv=2,n_jobs=8,scoring='accuracy')

# Generar modelo
grid_search_cv.fit(X_train, y_train)

#Almacenar y evaluar la mejor configuración con el conjunto de entrenamiento (engañoso)
dt = grid_search_cv.best_estimator_
dt.score(X_train,y_train)

#Evaluar la mejor configuración con el conjunto de prueba (correcto)
res_test = dt.score(X_test,y_test)
print("Accuracy: ", res_test)

#Ejemplo de prediccion
print('Prediccion: ', dt.predict(X_test.iloc[[0]]))

#Exportar el modelo
import joblib
joblib.dump(dt, 'dt1.joblib')

