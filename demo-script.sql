-- Напишете заявка, която общите приходи, които трябва да се предоставят на главните
-- за да задоволят нуждите на себе си и подчинените им

WITH RECURSIVE SubordinatesTree AS (
	SELECT 
		ID,
		Name,
		Salary,
		ManagerID,
		ID AS MainID,
		Name AS MainName
	FROM Organization 
	WHERE ManagerID IS NULL
	
	UNION
	
	SELECT 
		o.ID,
		o.Name,
		o.Salary,
		o.ManagerID,
		st.MainID,
		st.MainName
	FROM Organization o
	JOIN SubordinatesTree st
		ON st.ID = o.ManagerID
)
SELECT
	st.MainID,
	SUM(st.Salary)
FROM SubordinatesTree st
GROUP BY st.MainID;

-- Напишете заявка, която изкарва средната заплата
-- за всяко ниво от йерархията

WITH RECURSIVE SubordinatesByLevels AS (
	SELECT
		ID,
		Name,
		Salary,
		ManagerID,
		0 AS Level
	FROM Organization
	WHERE ManagerID IS NULL
	
	UNION
	
	SELECT
		o.ID,
		o.Name,
		o.Salary,
		o.ManagerID,
		sbl.Level + 1
	FROM Organization o
	JOIN SubordinatesByLevels sbl
		ON o.ManagerID = sbl.ID
)
SELECT 
	sbl.Level,
	AVG(sbl.Salary) AS AvgSalary
FROM SubordinatesByLevels sbl
GROUP BY sbl.Level
ORDER BY sbl.Level;