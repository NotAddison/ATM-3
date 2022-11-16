#!/usr/bin/env python
# coding: utf-8

# # Outlier Analysis for Mock Data (PFD)

# ## Objectives:
# ### Visualize data
# ### Detect outliers in mock data

# In[1]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import warnings
import requests
import plotly.express as px
import plotly.graph_objects as go
df = pd.read_csv('mockdata.csv')
df.info()


# In[2]:


df.head()


# In[ ]:





# In[3]:


fig = go.Figure(go.Scatter(
    x = df['Transaction Date'],
    y = df['Transaction Amount']
))
fig.show()


# In[4]:


px.box(data_frame=df, x='Transaction Amount')


# In[5]:


px.violin(data_frame=df, x='Transaction Amount')


# ## Using IQR to Estimate Outliers

# In[6]:


def traditional_outlier(df, x):
    q1 = df[x].quantile(.25)
    q3 = df[x].quantile(.75)
    iqr = q3 - q1
    df['IQR'] = np.where(df[[x]]<(q1-1.5*iqr), -1,
                       np.where(df[[x]]>(q3+1.5*iqr),-1,1))
    return df


# In[7]:


traditional_outlier(df, 'Transaction Amount')


# ## Using iForest to Estimate Outliers
# ### Too sensitive?
# 

# In[8]:


from sklearn.ensemble import IsolationForest


# In[9]:


iForestArray = IsolationForest().fit(df[['Transaction Amount']]).predict(df[['Transaction Amount']])
noOfOutliers = 0
for i in iForestArray:
    if i == -1:
        noOfOutliers += 1 
print("no. of outliers:" + str(noOfOutliers))


# In[10]:


from sklearn.covariance import EllipticEnvelope
EllipticArray = EllipticEnvelope().fit(df[['Transaction Amount']]).predict(df[['Transaction Amount']])
noOfOutliers = 0
for i in EllipticArray:
    if i == -1:
        noOfOutliers += 1
print("no. of outliers:" + str(noOfOutliers))


# In[11]:


from sklearn.neighbors import LocalOutlierFactor
LocalArray = LocalOutlierFactor(n_neighbors=5, novelty=True).fit(df[['Transaction Amount']]).predict(df[['Transaction Amount']])
noOfOutliers = 0
for i in LocalArray:
    if i == -1:
        noOfOutliers += 1 
print("no. of outliers:" + str(noOfOutliers))


# In[12]:


def outliers_find(df,x):
    q1 = df[x].quantile(.25)
    q3 = df[x].quantile(.75)
    iqr = q3 - q1
    df['IQR'] = np.where(df[[x]]<(q1-1.5*iqr), -1,
                np.where(df[[x]]>(q3+1.5*iqr),-1,1))
    df['Local Outlier'] = LocalOutlierFactor(n_neighbors=5, novelty=True).fit(df[[x]]).predict(df[[x]])
    df['iForest'] = IsolationForest().fit(df[[x]]).predict(df[[x]])
    df['Elliptical'] = EllipticEnvelope().fit(df[[x]]).predict(df[[x]])
    return df


# In[13]:


outliers_find(df,'Transaction Amount')


# In[14]:


df['Score'] = df['IQR'] + df['iForest'] + df['Local Outlier'] + df['Elliptical']
df.head()


# In[15]:


for i in df.index:
    if df['Score'][i] <= -2:
        df['Suspicious'][i] = 'Yes'
    else:
        df['Suspicious'][i] = 'No'
df.head()


# In[16]:


def getSusList():
    susData = df.loc[df['Suspicious'] == 'Yes']
    susList = []
    for i in susData.index:
        accountNo = df['Account ID'][i]
        score = df['Score'][i]
        susList.append([accountNo,score])
    return susList


# In[17]:


sussyList = getSusList()
print(sussyList)

# In[18]:

for i in range(len(sussyList)):
    r = requests.post(f'http://localhost:3000/blacklist/modify/{sussyList[i][0]},{sussyList[i][1]}')
r2 = requests.get('http://localhost:3000/variables')
print(r2.text)
print(r.status_code)


# In[ ]:


# r = requests.get('http://localhost:3000/variables')
# print(r)


# In[ ]:





# In[ ]:




