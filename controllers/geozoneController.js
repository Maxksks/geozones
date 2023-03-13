const Geozone = require('../models/Geozone')

class GeozoneController {
    /** пример объекта запроса
            {
                name: 'Penza',
                location: {
                    "type": "Polygon",
                    "coordinates": [[
                        [-109, 41],
                        [-102, 41],
                        [-102, 37],
                        [-109, 37],
                        [-109, 41]
                    ]]
                }
            }
    * */
    async createZone(req, res){
        try{
            const newZone = req.body
            const zone = await Geozone.create(newZone)
            await zone.save()

            return res.status(201).json(zone)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Cant create geozone'})
        }

    }

    async getAllZones(req, res){
        try{
            const zones = await Geozone.find()
            return res.status(201).json(zones)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Bad request'})
        }

    }

    async getZone(req, res){
        try{
            const zoneName = req.params.name
            const zone = await Geozone.findOne({name: zoneName})
            return res.status(201).json(zone)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Bad request'})
        }
    }

    async updateZone(req, res){
        try{
            const zoneName = req.params.name
            const zoneBody = req.body
            const existingZone = await Geozone.findOne({name: zoneName})

            if(!existingZone){
                return this.createZone(req, res)
            }

            await Geozone.findOneAndUpdate({name: zoneName}, zoneBody)

            return res.status(201).json({message: 'Success'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Cant update'})
        }
    }

    async deleteZone(req, res){
        try{
            const zoneName = req.params.name
            const zone = await Geozone.findOneAndRemove({name: zoneName})
            return res.status(201).json(zone)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message:'Failed deletion'})
        }
    }

    /**
     * Поиск по всей базе переданной точки
     */
    async findZone(req, res){
        try{
            const coordinate = {
                type: "Point",
                coordinates: req.body.coordinates
            }
            const zone = await Geozone.findOne({
                location: {
                    $geoIntersects: { $geometry: coordinate }
                }
            })
            if (zone){
                return res.status(201).json(zone)
            } else {
                return res.status(201).json({message: 'No such geo zone'})
            }

        } catch (e) {
            console.log(e)
            return res.status(500).json({message:'Bad Request'})
        }
    }

    /**
     * Проверка вхождения координаты
     * в искомую зону (передается название зоны)
     */
    async coordinateInZone(req, res){
        try{
            const coordinate = {
                type: "Point",
                coordinates: req.body.coordinates
            }
            const zoneName = req.params.name
            const zone = await Geozone.findOne({
                location: {
                    $geoIntersects: { $geometry: coordinate }
                },
                name: zoneName
            })
            if (zone){
                return res.status(201).json(zone)
            } else {
                return res.status(201).json({message: 'Coordinate does not locate in this zone'})
            }

        } catch (e) {
            console.log(e)
            return res.status(500).json({message:'Bad Request'})
        }
    }
}

module.exports = new GeozoneController()