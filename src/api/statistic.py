import sys
import statistics
import numpy as np
import matplotlib.pyplot as plt
import os
import seaborn as sns

dataReceived = sys.argv[1]

with open(dataReceived, "r") as file:
    data_string = file.read()
file.close()

data = list(map(int, data_string.split(", ")))

with open("dataNume.TXT", "r") as file1:
    data_string1 = file1.read()
file1.close()
data1 = list(data_string1.split(", "))


median = statistics.median(data)
mean = statistics.mean(data)
data_range = max(data) - min(data)
mode_value = statistics.mode(data)
variance = np.var(data)
standard_deviation = np.std(data)


if os.path.exists("diagrama.png"):
    os.remove("diagrama.png")
if os.path.exists("exp.png"):
    os.remove("exp.png")
if os.path.exists("Pie.png"):
    os.remove("Pie.png")
if os.path.exists("BarChart.png"):
    os.remove("BarChart.png")
if os.path.exists("boxenplot.png"):
    os.remove("boxenplot.png")


result = f"Median: {median}<br>Mean: {mean}<br>Range: {data_range}<br>Mode: {mode_value}<br>Variance: {variance}<br>StandardDeviation: {standard_deviation}<br>"

plt.figure()
plt.hist(data, density=True, alpha=0.5, label="Data Histogram")
plt.xlabel("Values")
plt.ylabel("Probability Density")
plt.legend()
plt.title("Example Chart")
plt.savefig("diagrama.png")


plt.figure()
exponential_data = np.random.exponential(scale=10, size=len(data))
plt.hist(data, density=True, alpha=0.5, label="Data Histogram")
plt.hist(exponential_data, density=True, alpha=0.5, label="Exponential Distribution")
plt.xlabel("Values")
plt.ylabel("Probability Density")
plt.legend()
plt.title("Exponential Distribution Example")
plt.savefig("exp.png")


plt.figure()
plt.bar(data1, data, 10)

plt.xticks([])

plt.xlabel("Categories")
plt.ylabel("Values")
plt.title("Bar Chart")

plt.savefig("BarChart.png")

plt.figure()

min_percentage = 2
total = sum(data)
filtered_labels = []
filtered_values = []
other_percentage = 0
for label, value in zip(data1, data):
    percentage = (value / total) * 100
    if percentage >= min_percentage:
        filtered_labels.append(label)
        filtered_values.append(value)
    else:
        other_percentage += percentage

filtered_labels.append("Altele")
filtered_values.append(other_percentage)
plt.pie(filtered_values, labels=filtered_labels, autopct="%1.1f%%")
plt.title("Pie Chart (With 'Others' Category)")
plt.savefig("Pie.png")


plt.figure()

sns.boxenplot(data=data)


plt.savefig("boxenplot.png")


print(result)
