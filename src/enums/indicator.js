const ScheduleWork = {
  name: '已排产占比',
  definition: `已排产占比 = 加工已排件数 / 需处理加工件数`
}
const FinishedWork = {
  name: '已出库占比',
  definition: `已出库占比 = 加工已出库件数 / 需处理加工件数`
}
const EstimateFinish = {
  name: '预估完成率',
  definition: `预估完成率 = 实际下单量 / 渠道预估单量，<br>其中渠道含猫超，官网，O2O，旗舰店，创新渠道`
}
const OrderItem = {
  name: '需处理单件比',
  definition: `需处理单件比 = 需处理件数 / 需处理单量`
}
const Capacity = {
  name: '产能饱和度',
  definition: `产能饱和度 = 需处理件数 / 仓运营产能`
}
const SelfDelivery = {
  name: '自配占比',
  definition: `自配占比 = 自配单量 / 总配送单量`
}
const FinishedRate = {
  name: '妥投率',
  definition: `妥投率 = (自配妥投单量 + 3pl 妥投单量) / (自配单量 + 3PL 单量)`
}

export { ScheduleWork, FinishedWork, EstimateFinish, OrderItem, Capacity, SelfDelivery, FinishedRate }
