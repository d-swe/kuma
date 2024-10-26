import { API_URL } from "@/config";
import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FaPen } from "react-icons/fa";
import { DeleteAlert } from "../modal/DeleteAlert";

interface DataItem {
    id: number; 
}

type FormComponent<T> = React.ComponentType<{
  data?: T,
  onClose: () => void
}>;

export function DefaultTable<T extends DataItem>({
	columns,
	endpoint,
  FormComponent,
  description
}: {
	columns: ColumnDef<T>[];
	endpoint: string;
  FormComponent: FormComponent<T>;
  description: string;
}) {
	const [data, setData] = React.useState<T[]>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const url = `${API_URL}/${endpoint}`;
  const [isCreate, setIsCreate] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editData, setEditData] = React.useState<T>();
  const [showAlert, setShowAlert] = React.useState(false);
  const [dataId, setDataId] = React.useState<number | null>(null);

  // fetch all data immediately
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				const data: T[] = await response.json();
				setData(data);
				console.log(data);
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};
		fetchData();
	}, []);

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

  // fetch specfic data with id
  	const handleEditData = async (id: number) => {
		try {
			let url = `${API_URL}/${endpoint}/${id}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			const data: T = await response.json();
			setEditData(data); 
      console.log("Edit data:", data);
		} catch (error) {
			console.error("Error:", error);
		}
		setIsEdit(!isEdit);
	};

	const handleCreate = () => {
		setIsCreate(!isCreate);
	};

  const closeForm = () => {
		setIsCreate(false);
		setIsEdit(false);
		setEditData(undefined);
	};

	// const handleDelete = async (id: number) => {
	// 	setDataId(id);
	// 	setShowAlert(true);
	// }

  const confirmDelete = async () => {
		if(dataId === null) return;
		try {
			let url = `${API_URL}/${endpoint}/${dataId}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			setData(data.filter(d => d.id !== dataId))
		} catch (error) {
			console.error("Error:", error);
		}
		setShowAlert(false);
		setDataId(null);
	};

	return (
    		<div className="w-full pr-12">
			<Button onClick={handleCreate} className="capitalize">Add {endpoint}</Button>
			{(isCreate || isEdit) ? (
				<FormComponent 
					data={editData}
					onClose={closeForm}
				/>
			) : (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder={`Filter ${endpoint}...`}
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
								<TableHead className="text-right">Edit</TableHead>
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
									<TableCell className="flex flex-row justify-end gap-4">
										<Button
											size="sm"
											onClick={() => handleEditData(row.original.id)}
										>
											{<FaPen />}
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
)}
  <DeleteAlert showAlert={showAlert} setShowAlert={setShowAlert} onConfirm={confirmDelete} description={description}/>
</div>
	);
}
