<template>
	<div class="container">
		<Menu v-if="showMenu" :contextPos="contextPos" @menyItemCmd="menyItemCmd" />
		<table class="table">
			<tbody class="table-body">
				<tr class="table-list" v-for="(row, index) in tableData.rows" :key="index">
					<td
						class="table-item"
						v-for="(col, index) in tableData.cols"
						:class="{ selected: selectedCells.includes((row - 1) * tableData.cols + col - 1) }"
						:key="index"
						:colspan="tableData.layoutDetail[(row - 1) * tableData.cols + col - 1] && tableData.layoutDetail[(row - 1) * tableData.cols + col - 1]['colSpan']"
						:rowspan="tableData.layoutDetail[(row - 1) * tableData.cols + col - 1] && tableData.layoutDetail[(row - 1) * tableData.cols + col - 1]['rowSpan']"
						v-show="isNeedShow(row - 1, col - 1)"
						@mousedown="e => handleCellMousedown(e, row, col)"
						@mouseenter.stop.prevent="handleCellMouseenter(row, col)"
						@mouseup="handleMouseUp"
						@contextmenu.prevent.stop="handleContendMenu"
					>
					{{ row }}--{{ col }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script setup lang="ts">
// 这块其实初始设置 tableData： {cols: 3, rows: 2} 就可以 把tabelDate设置成计算属性，layoutDetail 用js生成更方便
const tableData = reactive({
	cols: 3,
	rows: 2,
	layoutDetail: [
		{
			colSpan: 1,
			rowSpan: 1,
		},
		{
			colSpan: 1,
			rowSpan: 1,
		},
		{
			colSpan: 1,
			rowSpan: 1,
		},
		{
			colSpan: 1,
			rowSpan: 1,
		},
		{
			colSpan: 1,
			rowSpan: 1,
		},
		{
			colSpan: 1,
			rowSpan: 1,
		}
	]
})
const selectedCells = ref([])
// mousedown的时候设置为其他值 否则都是-1
let selectionHold = ref(-1)
const startX = ref(-1)
const startY = ref(-1)
const endX = ref(-1)
const endY = ref(-1)
const showMenu = ref(false)
let contextPos = reactive({
	l: 0,
	t: 0
})

const clearSelection = () => {
	selectedCells.value = []
}
const changeShowMenu = () => {
	showMenu.value = !showMenu.value
}
const isNeedShow = (row, col) => {
	let hiddenTdMapss = {}
	for (let i = 0; i < tableData.rows; i++) {
		for (let j = 0; j < tableData.cols; j++) {
			if (tableData.layoutDetail[i * tableData.cols + j]) {
				let colInfo = tableData.layoutDetail[i * tableData.cols + j]
				if ((colInfo.colSpan && colInfo.colSpan > 1) || (colInfo.rowSpan && colInfo.rowSpan > 1)) {
					for (let row = i; row < i + (colInfo.rowSpan || 1); row++) {
						// col = (row === i ? j + 1 : j) 是为了避开自己
						for (let col = (row === i ? j + 1 : j); col < (j + (colInfo.colSpan || 1)); col++) {
							hiddenTdMapss[`${row}_${col}`] = true
						}
					}
				}
			}
		}
	}
	return !hiddenTdMapss[`${row}_${col}`]
}
const handleCellMousedown = (e, x, y) => {
	showMenu.value = false
	if (e.which === 1) {
		endX.value = -1
		endY.value = -1
	}
	// e.witch = 1 是鼠标左键
	if (e.which !== 1) return
	let cellIndex = (x - 1) * tableData.cols + y - 1
	startX.value = x
	startY.value = y
	selectedCells.value = [cellIndex]
	// mousedown标志
	selectionHold.value = cellIndex
}
const handleCellMouseenter = (x, y) => {
	if (selectionHold.value !== -1) {
		endX.value = x
		endY.value = y
		rendSelectedCell()
	}
}
const rendSelectedCell = () => {
	let startXX = Math.min(startX.value, endX.value)
	let startYY = Math.min(startY.value, endY.value)
	let endXX = Math.max(startX.value, endX.value)
	let endYY = Math.max(startY.value, endY.value)
	let selectedCell = []
	for (let row = 1; row <= tableData.cols; row++) {
		for (let col = 1; col <= tableData.cols; col++) {
			if (row >= startXX && row <= endXX && col >= startYY && col <= endYY) {
				selectedCell.push((row - 1) * tableData.cols + col - 1)
			}
		}
	}
	selectedCells.value = selectedCell
}
const handleMouseUp = (e) => {
	selectionHold.value = -1
}
const handleContendMenu = (e) => {
	showMenu.value = true
	contextPos.l = e.pageX
	contextPos.t = e.pageY
}
const reRenderTableLayout = () => {
	let arr = []
	for (let i = 0; i < tableData.cols * tableData.rows; i++) {
		arr.push({
			colSpan: '',
			rowSpan: ''
		})
	}
	tableData.layoutDetail = arr
}
const menyItemCmd = (cmd) => {
	let startXX = Math.min(startX.value, endX.value)
	let startYY = Math.min(startY.value, endY.value)
	let endXX = Math.max(startX.value, endX.value)
	let endYY = Math.max(startY.value, endY.value)
	switch (cmd) {
		case 'merge':
			if ((startXX === -1 || startYY === -1 || endXX === -1 || endYY === -1) || ((startXX === endXX) && (startYY === endYY))) return
			let startIndex = (startXX - 1) * tableData.cols + startYY - 1
			tableData.layoutDetail[startIndex].rowSpan = endXX - startXX + 1
			tableData.layoutDetail[startIndex].colSpan = endYY - startYY + 1
			break
		case 'split':
			tableData.layoutDetail.forEach(v => {
				v.rowSpan = 1
				v.colSpan = 1
			})
			break
		case 'delRow':
			tableData.rows = tableData.rows - 1
			// 行号 列号变化时候  需要重新渲染 this.tableData.layoutDetail
			reRenderTableLayout()
			break
		case 'delCol':
			tableData.cols = tableData.cols - 1
			reRenderTableLayout()
			break
		case 'addRow':
			tableData.rows = tableData.rows + 1
			reRenderTableLayout()
			break
		case 'addCol':
			tableData.cols = tableData.cols + 1
			reRenderTableLayout()
			break
		case 'clearSelection':
			clearSelection()
			break
	}
	changeShowMenu()
}
</script>

<style lang='less'>
.container {
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Chrome/Safari/Opera */
	-khtml-user-select: none; /* Konqueror */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently*/

	.table {
		border-collapse: collapse;
		width: 100%;

		.table-body {
			.table-list {
				height: 50px;
				line-height: 50px;

				&:hover {
					//  background:#eef1f6;
				}
				td {
					padding: 0 10px;
					border: 1px solid #dfe6ec;

					&.selected {
						background: #d4e7f5;
					}
				}
			}
		}
	}
}
</style>