# Описание решения
Решение задачи описано в документе  [Solution.md](./smart-home-msa-solution/documentation/solution.md)

# Запуск примера
## ПО неоходимое для запуска
- mimikub ([Инструкция по установке](https://minikube.sigs.k8s.io/docs/start/));
- API GW kusk CLI ([Инструкция по установке](https://docs.kusk.io/getting-started/install-kusk-cli))

## Порядок запука
1. Запустить minikube
```bash
minikube start
```
2. После успешного старата minikube, запустить поды и сервисы приложения выполнив [скрипт](./smart-home-msa-solution/kuber/1.start-all.sh)
```bash
cd smart-home-msa-solution/kuber
```
```bash
sh ./1.start-all.sh
```
3. После запуска всех под (pod) установить kusk
```bash
helm repo add kubeshop https://kubeshop.github.io/helm-charts
```
```bash
helm repo update
```
```bash
helm upgrade \
  --install \
  --wait \
  --create-namespace \
  --namespace kusk-system \
  kusk-gateway \
  kubeshop/kusk-gateway 
```
```bash
helm upgrade \
  --install \
  --wait \
  --set service.type=LoadBalancer \
  --set fullnameOverride=kusk-gateway-envoy-fleet \
  --set default=true \
  --namespace kusk-system \
  kusk-gateway-envoy-fleet \
  kubeshop/kusk-gateway-envoyfleet
```
4. Настроить API из описания [./smart-home-msa-solution/smart-home-app/api.yml](./smart-home-msa-solution/smart-home-app/api.yml)
```bash
kusk deploy -i ../smart-home-app/api.yml
```
5. Настроить port forwarding
```bash
kubectl port-forward svc/kusk-gateway-envoy-fleet -n kusk-system 8081:80
```

## Проверка
1. Создание нового устройства
```bash
$ curl --location --request GET 'http://localhost:8081/devices'
{"message":"Devices are not found"}

$ curl --location --request POST 'http://localhost:8081/devices' \
--header 'Content-Type: application/json' \
--data-raw '{
    "serial_number": "ABC",
    "device_type_id": 1,
    "house_id": 1
}'
{"is_on":false,"id":3,"device_type_id":1,"house_id":1,"serial_number":"ABC","updatedAt":"2024-10-04T13:16:35.657Z","createdAt":"2024-10-04T13:16:35.657Z"}

$ curl --location --request GET 'http://localhost:8081/devices'
[{"id":3,"serial_number":"ABC","device_type_id":1,"house_id":1,"is_on":false,"createdAt":"2024-10-04T13:16:35.657Z","updatedAt":"2024-10-04T13:16:35.657Z"}] 
```
2. Отправка телеметрии
```bash
curl --location --request GET 'http://localhost:8081/telemetry'
```
```bash
curl --location --request POST 'http://localhost:8081/telemetry' \
--header 'Content-Type: application/json' \
--data-raw '{
    "device_id": 1,
    "data": {
        "prop1": 1,
        "prop2": 2
    }
}'
```

3. Отправка команды устройству
```bash
curl --location --request POST 'http://localhost:8081/device/1/command' \
--header 'Content-Type: application/json' \
--data-raw '{
    "command_id": 0,
    "input_parameters": {
        "is_on": true
    }
}'
```
4. Получение данных системы отопления
```bash
curl --location --request GET 'http://localhost:8081/heating/1'
```
```
{"id":1,"targetTemperature":21,"currentTemperature":0,"on":false}
```
5. Обновление состояния системы отопления
```bash
curl --location --request PUT 'http://localhost:8081/heating/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "on":true,
    "targetTemperature":33.0,
    "currentTemperature":25.0
}'
```
```
{"id":1,"targetTemperature":33,"currentTemperature":0,"on":true}
```
** currentTemperature всегда возвращает 0, видимо есть какая-то проблема с маппингом в монолите